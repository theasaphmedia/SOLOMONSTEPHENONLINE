#!/usr/bin/env python3
"""
git_safe_commit.py — Permanently bypass Linux-mount file truncation.

USAGE:
  python3 git_safe_commit.py "commit message" [file1 file2 ...]
  If no files listed, auto-detects all modified tracked files.
"""
import subprocess, sys, os, shutil, tempfile

REPO = os.path.dirname(os.path.abspath(__file__))

def git(cmd, env=None, input_bytes=None, check=True):
    r = subprocess.run(['git']+cmd, capture_output=True,
                       input=input_bytes, cwd=REPO,
                       env=env or os.environ.copy())
    if check and r.returncode != 0:
        print(f"  git error: {r.stderr.decode().strip()}", file=sys.stderr)
        sys.exit(1)
    return r.stdout.decode().strip()

def hash_file_safe(abs_path):
    """Read FULL file via Python (bypasses mount truncation) → git blob."""
    with open(abs_path, 'rb') as f:
        content = f.read()
    content = content.rstrip(b'\x00')   # strip NTFS null-byte padding
    blob = git(['hash-object', '-w', '--stdin'], input_bytes=content)
    return blob, len(content)

def detect_modified():
    diff   = git(['diff', '--name-only', 'HEAD'], check=False)
    others = git(['ls-files', '--others', '--exclude-standard'], check=False)
    files  = [f for f in (diff+'\n'+others).split('\n') if f]
    return [f for f in files if os.path.exists(os.path.join(REPO, f))]

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 git_safe_commit.py 'message' [file1 file2 ...]")
        sys.exit(1)

    message   = sys.argv[1]
    rel_files = sys.argv[2:] if len(sys.argv) > 2 else detect_modified()

    if not rel_files:
        print("Nothing to commit.")
        sys.exit(0)

    # Temp index based on current HEAD — never touches .git/index
    tmp_idx = tempfile.mktemp(prefix='/tmp/safe_idx_')
    shutil.copy(os.path.join(REPO, '.git', 'index'), tmp_idx)
    env = os.environ.copy()
    env['GIT_INDEX_FILE'] = tmp_idx

    print(f"\nStaging {len(rel_files)} file(s) safely...\n")
    for rel in rel_files:
        abs_path = os.path.join(REPO, rel)
        if not os.path.exists(abs_path):
            print(f"  SKIP  {rel}  (not found)")
            continue
        blob, size = hash_file_safe(abs_path)
        mode = '100755' if os.access(abs_path, os.X_OK) else '100644'
        git(['update-index','--add','--cacheinfo',f'{mode},{blob},{rel}'], env=env)
        print(f"  OK  {rel}  ({size//1024}KB)  {blob[:10]}")

    # write-tree using temp index
    r = subprocess.run(['git','write-tree'], capture_output=True, cwd=REPO, env=env)
    if r.returncode != 0:
        print(f"  write-tree failed: {r.stderr.decode()}", file=sys.stderr)
        sys.exit(1)
    tree = r.stdout.decode().strip()

    parent = git(['rev-parse','HEAD'])
    commit = git(['commit-tree', tree, '-p', parent, '-m', message])

    ref_path = os.path.join(REPO, '.git', 'refs', 'heads', 'main')
    with open(ref_path, 'w') as f:
        f.write(commit + '\n')

    try: os.remove(tmp_idx)
    except: pass

    print(f"\n==> Committed {commit[:14]}  \"{message}\"")
    print("Now run:  git push origin main:master --force\n")

if __name__ == '__main__':
    main()

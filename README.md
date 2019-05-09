# jfarmer/react-racer

- original: https://github.com/jfarmer/react-racer
- codesandbox fork: https://github.com/100ideas/react-racer/tree/codesandbox

### setup
- adjust the `SERVER` variable in `package.json` `start` script to be the full url of this codesandbox instance (visible in browser preview)

### how this works [on codesandbox](https://codesandbox.io/s/2v0n4v15z0)

The `start` script in `package.json` first uses svn to sync root of github repo `/` to codesandbox `.` aka `/sandbox/`. Visitors/forkers of this codesandbox should always get an up-to-date demo.

trickiest part of getting this to work was figuring out how to tell codesandbox host server which port to proxy (wanted to use port 3000 at first). turns out the way is to set `container: { "port": 8000 }` in `sandbox.config.json`.

### using svn w/ github

```bash
# sync repo:
svn checkout -r HEAD --force https://github.com/jfarmer/react-racer/trunk .

# svn info
svn help checkout

checkout (co): Check out a working copy from a repository.
usage: checkout URL[@REV]... [PATH]

  If specified, REV determines in which revision the URL is first
  looked up.

  If PATH is omitted, the basename of the URL will be used as
  the destination. If multiple URLs are given each will be checked
  out into a sub-directory of PATH, with the name of the sub-directory
  being the basename of the URL.

  If --force is used, unversioned obstructing paths in the working
  copy destination do not automatically cause the check out to fail.
  If the obstructing path is the same type (file or directory) as the
  corresponding path in the repository it becomes versioned but its
  contents are left \'as-is\' in the working copy. This means that an
  obstructing directory\'s unversioned children may also obstruct and
  become versioned.  For files, any content differences between the
  obstruction and the repository are treated like a local modification
  to the working copy.  All properties from the repository are applied
  to the obstructing path.

Valid options:
  --force                 : force operation to run

  -r [--revision] ARG      : ARG (some commands also take ARG1:ARG2 range)
                            ...
                           'HEAD'       latest in repository
```

### set up shell

```bash
alias l='ls -la'

```

---

archive of `package.json`

```json
{
  "name": "jfarmer-react-racer",
  "version": "1.0.0",
  "description": "jfarmer/react-racer for codesandbox server",
  "private": false,
  "workspacesOLD": ["api", "frontend"],
  "scripts": {
    "start": "npm-run-all --sequential install:server install:frontend start:both",
    "install:server": "cd ~/api; yarn install",
    "install:frontend": "cd ~/frontend; yarn install",
    "start:both": "npm-run-all --parallel start:server start:frontend",
    "start:server": "cd api; yarn start",
    "start:frontend": "cd frontend; yarn start",
    "syncrepo": "svn checkout -r HEAD --force https://github.com/jfarmer/react-racer/trunk ."
  },
  "dependencies": {},
  "devDependencies": {
    "nodemon": "1.18.4",
    "npm-run-all": "^4.1.5"
  },
  "keywords": []
}
```

archive of `sandbox.config.json`

```json
{
  "infiniteLoopProtection": true,
  "hardReloadOnChange": false,
  "view": "browser",
  "server": "true",
  "container": {
    "port": 3000
  }
}
```

---

### codesandbox advanced config documentation

https://github.com/CompuIves/codesandbox-client/issues/1199#issuecomment-430590886

> You can force the container port that CodeSandbox proxies on https://sandbox-id.sse.codesandbox.io/ by creating a sandbox.config.json file in the root of your sandbox, with the following contents:

```
{
  "container": {
    "port": 8000
  }
}
```

---

https://github.com/CompuIves/codesandbox-client/issues/1465

> We assume the start script (actually, we look for dev, develop, serve, start, in this particular order) starts the main process of the sandbox (the dev server, if you will). So, instead of demo, you can use one of dev, develop or serve.

{
  "name": "@electron/osx-sign",
  "version": "1.0.4",
  "description": "Codesign Electron macOS apps",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "files": [
    "dist",
    "entitlements",
    "README.md",
    "LICENSE",
    "bin"
  ],
  "bin": {
    "electron-osx-flat": "bin/electron-osx-flat.js",
    "electron-osx-sign": "bin/electron-osx-sign.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/electron/osx-sign.git"
  },
  "author": "electron",
  "license": "BSD-2-Clause",
  "bugs": {
    "url": "https://github.com/electron/osx-sign/issues"
  },
  "homepage": "https://github.com/electron/osx-sign",
  "dependencies": {
    "compare-version": "^0.1.2",
    "debug": "^4.3.4",
    "fs-extra": "^10.0.0",
    "isbinaryfile": "^4.0.8",
    "minimist": "^1.2.6",
    "plist": "^3.0.5"
  },
  "devDependencies": {
    "@types/compare-version": "^0.1.31",
    "@types/debug": "^4.1.7",
    "@types/fs-extra": "^9.0.13",
    "@types/node": "^16.11.6",
    "@types/plist": "^3.0.2",
    "@typescript-eslint/eslint-plugin": "^5.3.0",
    "@typescript-eslint/parser": "^5.3.0",
    "electron-download": "^4.1.0",
    "eslint": "^8.1.0",
    "eslint-config-eslint": "^7.0.0",
    "eslint-config-standard": "^16.0.3",
    "eslint-plugin-import": "^2.25.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^5.1.1",
    "extract-zip": "^2.0.1",
    "mkdirp": "^1.0.4",
    "rimraf": "^3.0.2",
    "run-series": "^1.1.9",
    "run-waterfall": "^1.1.7",
    "standard": "^16.0.4",
    "tape": "^4.7.1",
    "typescript": "^4.4.4"
  },
  "scripts": {
    "build": "tsc && tsc -p tsconfig.esm.json",
    "lint": "eslint --ext .ts,.js src bin test",
    "pretest": "rimraf test/work",
    "test": "yarn lint && tape test",
    "prepublishOnly": "yarn build"
  },
  "standard": {
    "ignore": [
      "test/work"
    ]
  },
  "engines": {
    "node": ">=12.0.0"
  }
}

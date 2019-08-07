## Prettier Sort Destructure

Input:

```
var { b, d, c } = {
    b: 1,
    d: 2,
    c: 3
};
```

Output:

```
var { b, c, d } = {
    b: 1,
    d: 2,
    c: 3
};
```

#### Setup:

Install: 
```
npm install --save-dev prettier-sort-destructure
```

Use:

```
prettier --parser node_modules/prettier-sort-destructure/index.js <...files>
```

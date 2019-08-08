var walk = require("estree-walker").walk;

function sortKeys(node) {
  var properties = node.properties;
  node.properties = properties.sort(function(a, b) {
    return a.key.name.localeCompare(b.key.name);
  });
  node.properties.map(function(prop) {
    delete prop.start;
    delete prop.end;
  });
}

module.exports = function(text, parser) {
  var ast = parser.babel(text);
  walk(ast, {
    enter: function(node) {
      if (
        node.type === "VariableDeclarator" &&
        node.id.type === "ObjectPattern"
      ) {
        sortKeys(node.id);
      } else if (
        node.type === "ObjectProperty" &&
        node.key.type === "Identifier" &&
        node.value.type === "ObjectPattern"
      ) {
        sortKeys(node.value);
      }
    }
  });
  return ast;
};

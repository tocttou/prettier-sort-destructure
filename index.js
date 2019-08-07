var walk = require("estree-walker").walk;

module.exports = function(text, parser) {
  var ast = parser.babel(text);
  walk(ast, {
    enter: function(node) {
      if (
        node.type === "VariableDeclarator" &&
        node.id.type === "ObjectPattern"
      ) {
        var properties = node.id.properties;
        node.id.properties = properties.sort(function(a, b) {
          return a.key.name.localeCompare(b.key.name);
        });
        node.id.properties.map(function(prop) {
          delete prop.start;
          delete prop.end;
        });
      }
    }
  });
  return ast;
};

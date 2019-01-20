const TemplateEngine = function(template, data) {
  let re = /<%([^%>]+)?%>/g,
    keywords = /(^(  )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = "let r = [];\n",
    cursor = 0;
  let match;

  const add = function(line, js) {
    js
      ? (code += line.match(keywords) ? line + "\n" : "r.push(" + line + ");\n")
      : (code +=
          line != "" ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : "");

    return add;
  };

  while ((match = re.exec(template))) {
    add(template.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }

  add(template.substr(cursor, template.length - cursor));
  code += 'return r.join("");';

  console.log(code);

  return new Function(code.replace(/[\r\t\n]/g, "")).apply(data);
};

const template =
  "<p>Hello, my name is <%this.name%>. I am <%this.profile.age%> years old.</p>";

const forTemplate =
  "My skills:" +
  "<%for(var index in this.skills) {%>" +
  '<a href="#"><%this.skills[index]%></a>' +
  "<%}%>;";

var diffTemplate =
  "My skills:" +
  "<%if(this.showSkills) {%>" +
  "<%for(var index in this.skills) {%>" +
  '<a href="#"><%this.skills[index]%></a>' +
  "<%}%>" +
  "<%} else {%>" +
  "<p>none</p>" +
  "<%}%>";

console.log(
  TemplateEngine(diffTemplate, {
    skills: ["js", "html", "css"],
    showSkills: true
    // name: "Georgi",
    // profile: {
    //   age: 22
    // }
  })
);

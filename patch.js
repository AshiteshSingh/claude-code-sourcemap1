const fs = require('fs');
let content = fs.readFileSync('cli.mjs', 'utf8');

const regex = /this\.binShell=process\.env\.SHELL\|\|"\/bin\/bash",this\.shell=([a-zA-Z0-9_]+)\(this\.binShell,\["-l"\]/;
if (regex.test(content)) {
    content = content.replace(regex, 'this.binShell="powershell.exe",this.shell=$1(this.binShell,[]');
    fs.writeFileSync('cli.mjs', content);
    console.log('PATCHED successfully!');
} else {
    console.log('NOT FOUND!');
}

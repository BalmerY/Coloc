const util=require('util');

exports.debug = (v) =>{
console.log(util.inspect(v, { compact: true, depth: 5, breakLength: 80, colors: true }));
}
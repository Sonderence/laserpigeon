// Optional: node build-standalone.cjs combines the editable game into one HTML file.
const fs=require('fs'),path=require('path'),base=path.join(__dirname,'dist');
let html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const css=fs.readFileSync(path.join(base,'style.css'),'utf8').replace(/@import[^;]+;/,'');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>');
for(const name of ['overrides','art','levels','game']){
 let js=fs.readFileSync(path.join(base,name+'.js'),'utf8');
 // Inline simple quoted assets/... references in image overrides for offline use.
 if(name==='overrides')js=js.replace(/(['"])(assets\/[^'"]+\.png)\1/g,(match,quote,asset)=>{
   const file=path.join(base,asset);return fs.existsSync(file)?quote+'data:image/png;base64,'+fs.readFileSync(file).toString('base64')+quote:match;
 });
 html=html.replace('<script src="'+name+'.js"></script>',()=>'<script>'+js+'</script>');
}
fs.writeFileSync(path.join(__dirname,'Laser Pigeon.html'),html);
console.log('Saved Laser Pigeon.html');

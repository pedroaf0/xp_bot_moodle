const puppeteer = require('puppeteer');

const wait_ =  (s)=> new Promise((re,err)=>{
    console.log(s)
    setTimeout(()=>{console.log("done"); re();}, s);
    

});

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // fazendo login
  await page.goto('https://moodle.sertao.ifrs.edu.br/login/index.php');
  await page.type('#username', "2019309735");
  await page.type('#password', "<senha>");
  await wait_(1000)
  await page.click('#loginbtn');
  await wait_(5000)

  // iniciando loop
  for (var i = 0; i < 100; i++) {
    console.log(i);

  // vai para o forum
  await page.goto('https://moodle.sertao.ifrs.edu.br/mod/forum/discuss.php?d=3727');
  // clica em 'responder'
  await page.click('#p6526 > div.d-flex.border.p-2.mb-2.forumpost.focus-target.firstpost.starter > div > div > div.no-overflow.w-100.content-alignment-container > div.d-flex.flex-wrap > div > a:nth-child(2)');
  await wait_(2500)
  // escreve a resposta
  await page.type('#inpage-reply-6526 > div.row.pb-1 > span > textarea', "Quem ainda não conseguiu achar para ver pode usar esse link para um canal no telegram com todos os filmes em dual audio [inglês-português] \n https://t.me/Harrypotterfilmes");
  await wait_(2500)
  // clica em 'publicar'
  await page.click('#inpage-reply-6526 > div:nth-child(2) > button.btn.btn-primary');
  await wait_(3000)
  // tira print
  await page.screenshot({ path: 'print.png' });
  // pega o id do post
  console.log(page.url().split("#p")[1]);
  // vai direto para a pagina de deletar post com o id
  await page.goto('https://moodle.sertao.ifrs.edu.br/mod/forum/post.php?delete='+page.url().split("#p")[1]);
  await wait_(3000)
  // obtem o botão de 'confimar' pelo XPath
  const elements = await page.$x('/html/body/div[3]/div[2]/div/div/section/div[1]/div/div/div/div/div[3]/div/div[1]/form/button')
  // clica em 'confirmar'
  await elements[0].click() 
  await wait_(3000)

  // repete
  
}
await browser.close(); 

})();



import nodePandoc from 'node-pandoc';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
const pandoc = require('node-pandoc');
const fs = require('fs');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
  console.log('Starting Nest at : http://localhost:3002');

// get the promise resolved (this promise returne the docx)
  const returnedDocx = pandocapi().then((res) => {
    console.log(res)
  })


}
bootstrap();


async function pandocapi(): Promise<any> {

  let promiseResolver;

  // resolver for promise, wait this docx creation for rendering
  const promise = new Promise((resolve) => {
    promiseResolver = resolve;
  })


  
  // nid html template for generate docx 
  var src = './src/template.html';
  // Arguments in either a single String or as an Array:
  var args = '-f html -t docx+styles --lua-filter=./src/columns.lua --reference-doc=./src/ref.docx -o doc.docx';
  // - f stands for --from : the source file format, e.g.html, markdown, etc.
  // - t for --to : the destination file format, e.g.html, markdown, etc.
  // - o stands for --output : the name of the generated file
  // - s stands for --standalone : produce output with an appropriate header and footer(e.g.a standalone HTML, LaTeX, TEI, or RTF file, not a fragment) or with metadata included

  // Set your callback function 
  // this callback return a docx and errors
  var callback = function (err, result) {

    let returnedStatus: boolean;
    if (err) {
      console.error('ERROR : ', err);
      returnedStatus = false
    } else {
      returnedStatus = true
      promiseResolver(result);
    }
    // Without the -o arg in ver args, the converted value will be returned.
    return returnedStatus;
  };
  // Call pandoc
  pandoc(src, args, callback)

  // return  the docx in promise
  return promise
}


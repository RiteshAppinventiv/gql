import { EMAIL_TEMPLATE } from 'src/common/constants';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

handlebars.registerHelper('hasName', function (value) {
  return value;
});

export class TemplateUtil {
  private template: string;
  private config;
  constructor(template) {
    this.template = template;
  }

  compileFile(compileData: unknown) {
    return new Promise((resolve, reject) => {
      compileData['fbLink'] = EMAIL_TEMPLATE.SOCIAL_LINK.FB;
      compileData['twitterLink'] = EMAIL_TEMPLATE.SOCIAL_LINK.TWITTER;
      compileData['instalLink'] = EMAIL_TEMPLATE.SOCIAL_LINK.INSTAGRAM;
      compileData['year'] = new Date().getFullYear();
      compileData['appLogo'] = EMAIL_TEMPLATE.APP_LOGO;
      compileData['title'] = EMAIL_TEMPLATE.TITLE;
      compileData['appName'] = EMAIL_TEMPLATE.TITLE;
      fs.readFile(this.template, 'utf8', (error, content) => {
        if (error) reject(error);
        try {
          const template = handlebars.compile(content);
          const html = template(compileData);
          resolve(html);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

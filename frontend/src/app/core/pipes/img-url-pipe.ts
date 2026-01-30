import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment.development';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {

  readonly  BACKEND_URL = environment.apiUrl;

  transform(filename: string | null | undefined): string {
    if(!filename) {
      return 'assets/images/placeholder.webp';
    }

    if(filename.startsWith('http')) {
      return filename;
    }

    return `${this.BACKEND_URL}/songs/file/${filename}`;
  }

}

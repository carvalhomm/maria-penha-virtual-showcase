import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attachment } from 'src/app/models/usuario.interface';
import { downloadFile } from '../utils/download.utils';
import { FileReaderService } from './file-reader.service';

interface DataInput {
  title: string;
  midias: Attachment[];
}

interface MidiaData {
  url: string | Uint8Array;
  path: string;
  originalName: string;
}

@Component({
  selector: 'mpv-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss'],
  providers: [FileReaderService]
})
export class FileReaderComponent implements OnInit {
  public midias: MidiaData[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: DataInput, private fileReaderService: FileReaderService, private matRef: MatDialogRef<FileReaderComponent>) { }

  ngOnInit(): void {
    this.downloadFiles(this.data.midias);
  }

  private downloadFiles(midias: Attachment[]) {
    const midiasProv = [];
    const promises: Promise<string | ArrayBuffer>[] = [];
    for (const midia of midias) {
      midiasProv.push({path: midia.path, url: null, originalName: midia.originalName});
      if (!midia.path) {
        promises.push(Promise.resolve(null));
        continue;
      }
      if (midia.path.includes('medida-protetiva')) {
        promises.push(this.fileReaderService.downloadBlobFile(midia.path));
      } else {
        promises.push(this.fileReaderService.download(midia.path));
      }
    }
    Promise.all(promises).then(promiseFullfilled => {
      promiseFullfilled.forEach((url, index) => {
        midiasProv[index].url = url;
      });
      this.midias = midiasProv;
    }).catch(err => console.log('error getting file --> ', err));
  }

  public parseMidiaName(midia: string): string {
    const midiaSplit = midia.split('.');
    return 'Prova Anexada.' + midiaSplit[midiaSplit.length - 1].toLowerCase();
  }

  public checkMidiaType(midia: string): 'image' | 'pdf' | 'audio' {
    if (!midia) { return undefined; }
    const splittedString = midia.split('.');
    const mediaType = splittedString[splittedString.length - 1];
    if (['jpg', 'jpeg', 'png'].includes(mediaType.toLowerCase())) {
      return 'image';
    }
    if (['mp3', 'mpeg', 'webm'].includes(mediaType.toLowerCase())) {
      return 'audio';
    }
    if (mediaType.toLowerCase() === 'pdf') {
      return 'pdf';
    }
    return undefined;
  }

  public async downloadFile(midia: MidiaData) {
    let midiaBlob: ArrayBuffer = midia.url instanceof ArrayBuffer ? midia.url : null;
    if (!midiaBlob) {
      midiaBlob = await this.fileReaderService.downloadBlobFile(midia.path);
    }
    downloadFile(midia.originalName, new Blob([new Uint8Array(midiaBlob)]));
  }

  public close() {
    this.matRef.close();
  }
}

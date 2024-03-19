import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token: any;

  constructor(
    private httpService: HttpService
  ) {
    this.token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : "";
  }

  addNotes(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.postServiceReset('https://localhost:44352/api/Note/AddNote', reqData, true, header);
  }

  getNotes() {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('https://localhost:44352/api/Note/GetAllNotes', true, header);
  }

  updateNotes(reqData: any, noteId: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService('https://localhost:44352/api/Note/UpdateNoteById?noteId='+noteId, reqData, true, header);
  }

  isArchive(noteId: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService('https://localhost:44352/api/Note/Archive?noteId='+noteId, {}, true, header);
  }

  isTrash(noteId: any) {
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.putService('https://localhost:44352/api/Note/Trash?noteId='+noteId, {}, true, header);
  }

  addColor(noteId: any, color: string) {
    // console.log('https://localhost:44352/api/Note/Add-Color?noteId=' + noteId + '&color=' + color);
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    const encodedColor = encodeURIComponent(color);
    return this.httpService.putService(`https://localhost:44352/api/Note/Add-Color?noteId=${noteId}&color=${encodedColor}`, {}, true, header);
  }

  deleteNote(noteId: any){
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.deleteService('https://localhost:44352/api/Note/DeleteNoteId?noteId='+noteId,true, header);
  }

  emptyTrash(){
    let header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.deleteService('https://localhost:44352/api/Note/EmptyTrash',true, header);
  }

}

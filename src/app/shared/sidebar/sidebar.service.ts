import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class SidebarService {
  public sidebarStatusObservable = new BehaviorSubject<boolean>(undefined);
  constructor() {}
}

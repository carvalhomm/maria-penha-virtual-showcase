import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Documento } from 'src/app/models/documento.interface';
import { UserRole } from 'src/app/models/UserClaims.interface';
import { PdfHeroService } from 'src/app/services/pdf-hero.service';
import { UserService } from 'src/app/services/user.service';
import { WarningDialogComponent } from 'src/app/shared/warning-dialog/warning-dialog.component';
import { DecisionMakerService } from '../../../decision-maker.service';

@Component({
  selector: 'mpv-decision-made-page',
  templateUrl: './decision-made-page.component.html',
  styleUrls: ['./decision-made-page.component.scss']
})
export class DecisionMadePageComponent implements OnInit {
  public processo: number;
  public userRole: UserRole;
  public decisionMade: {decideNow: boolean, waitForContraditory: boolean} = {decideNow: false, waitForContraditory: false};
  public loading: boolean = false;
  public doc = null;
  private documento: Documento;
  private decisionAlreadyMade: boolean = false;
  @Input() setMode(mode: 'feitos' | 'completos') {
    this.decisionAlreadyMade = mode === 'feitos' ? false : true;
  }
  @ViewChild('document') set pdfDocument(pdf: ElementRef) {
    if (!pdf || !pdf.nativeElement) { return; }
    if (this.decisionAlreadyMade) { return; }
    if (this.userRole === 'juiz' || this.userRole === 'direitoAgil') {
      this.decisionService.completeDenuncia().then(decisao => {
        if (decisao.status) {
          this.pdfHero.generateDecision(this.processo, pdf.nativeElement).then(() =>
            this.loading = false
          );
        } else {
          this.dialog.open(WarningDialogComponent, {
            data: {title: 'Erro', message: decisao.message}
          });
        }
      }).catch(error => {
        console.log('error on decide processo --> ', error);
        this.dialog.open(WarningDialogComponent, {
          data: {title: 'Erro', message: error}
        });
      });
    }
  }
  constructor(private router: Router, private decisionService: DecisionMakerService, private userService: UserService,
    private pdfHero: PdfHeroService, private dialog: MatDialog, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.documento = this.decisionService.getDocumento;
    this.doc = this.documento.juiz.minutaDecisao;
    this.userRole = this.userService.getUserClaims.role;
    this.processo = this.documento.numeroProcesso;
    this.decisionMade = this.documento.juiz.decisaoJuiz;
    if (this.userRole === 'juiz' || this.userRole === 'direitoAgil') {
      this.loading = true;
    }
  }

  public trustHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public saveChanges() {
    if (this.loading) { return; }
    this.loading = true;
    this.decisionService.saveDenuncia().then(decisao => {
      this.loading = false;
      if (decisao.status) {
        this.router.navigateByUrl('/administrativo');
      } else {
        this.dialog.open(WarningDialogComponent, {
          data: {title: 'Erro', message: decisao.message}
        });
      }
    }).catch(error => {
      this.loading = false;
      console.log('save changes error --> ', error);
      this.dialog.open(WarningDialogComponent, {
        data: {title: 'Erro', message: error}
      });
    })
  }

  public previousPage() {
    this.router.navigateByUrl('/administrativo');
  }

}

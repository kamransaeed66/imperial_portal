import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import icMail from '@iconify/icons-ic/twotone-mail';
import icPhone from '@iconify/icons-ic/twotone-phone';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
// import jsPDF from 'jspdf';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'vex-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class InvoiceComponent implements OnInit {

  icMail = icMail;
  icPhone = icPhone;
  board$:any;
  invoiceObj:any;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  constructor(private route: ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit() {
    console.log('admin job scrumboard ng on int')
    this.authService.getClientInvoices().subscribe((clients)=>{
      this.route.params.subscribe(params => {
          this.invoiceObj = clients.filter((obj)=>obj.invoiceId == params['invoice_Id'])[0];
          console.log('invoiceObj', this.invoiceObj)
      });
    });
  }

  getNetTotal() {
    let total = 0;
    this.invoiceObj.workers.forEach(element => {
      total += element.net;
    });
    return total;
  }

  getTotal(){
    let total = 0;
    var net = this.getNetTotal();
    var vat = this.invoiceObj.totalVat;
    var perc = ((vat/100)*net).toFixed(2);
    total = net + parseFloat(perc);
    console.log('total', total);
    return total;
  }

  public downloadAsPDF() {
    // const doc = new jsPDF();
    let doc = new jsPDF('p','pt', 'a4');
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   width: 190,
    //   'elementHandlers': specialElementHandlers
    // });

    // doc.save('Invoice.pdf');

    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   'width': 200,
    //   'elementHandlers': specialElementHandlers
    // },
    //  function(bla){doc.save('saveInCallback.pdf');}
    // );
      doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      'width': 320,
      'elementHandlers': specialElementHandlers
    },
     function(bla){console.log(bla); console.log('udfdfdf');doc.save('saveInCallback.pdf');}
    );

  }
}

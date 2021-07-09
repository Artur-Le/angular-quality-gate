import {Component, OnInit, TemplateRef} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {SightsService} from '../services/sights.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {

  sights: SightseeingPoint[];
  modalRef: BsModalRef;
  currentSight: SightseeingPoint;

  constructor(private sightsService: SightsService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getSights();
  }

  getSights(): void {
    this.sightsService.getSights().subscribe(sights => {
      this.sights = sights;
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  deleteItem(sight: SightseeingPoint): void {
    this.sightsService.deleteItem(sight).subscribe((res: ArrayBuffer) => {
          this.getSights();
    });
  }
}

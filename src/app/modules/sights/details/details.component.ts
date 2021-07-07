import {Component, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SightseeingPoint} from '../../../models/sightseeing-point';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent{
  @Input() modalRef: BsModalRef;
  @Input() currentSight: SightseeingPoint;

  constructor() { }

}

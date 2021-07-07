import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SightseeingPoint} from '../../../models/sightseeing-point';
import {SightsService} from '../../../services/sights.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Country} from '../../../models/country';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  currentSight: SightseeingPoint;
  latitude: number;
  longitude: number;
  longRegExp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/;
  latRegExp = /\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
  countries: Country[] = [
    {name: 'POLAND', iataCode: 'PL'},
    {name: 'GERMANY', iataCode: 'GER'},
    {name: 'ENGLAND', iataCode: 'EN'},
  ];

  constructor(private sightService: SightsService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      longitude: new FormControl('', [Validators.required, Validators.pattern(this.longRegExp)]),
      latitude: new FormControl('', [Validators.required, Validators.pattern(this.latRegExp)]),
      country: new FormControl('POLAND', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      color: new FormControl('', [Validators.required, Validators.min(1), Validators.max(3)]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.sightService.getSight(params.id).subscribe((snapshot: SightseeingPoint) => {
        if (!snapshot) {
          return;
        }
        const country = new Country(
          snapshot.country.name,
          snapshot.country.iataCode);
        this.currentSight = new SightseeingPoint(
          snapshot.name,
          snapshot.longitude,
          snapshot.latitude,
          country,
          snapshot.description,
          snapshot.color,
          snapshot.id);
        this.form.patchValue(this.currentSight);
      });
    });
  }

  addNew(sight: SightseeingPoint): void {
    this.sightService.addSight(sight).subscribe(() => {
      this.router.navigate(['']).catch(console.error);
    });
  }

  edit(sight: SightseeingPoint): void {
    this.sightService.editSight(this.currentSight.id, sight).subscribe(() => {
      this.router.navigate(['']).catch(console.error);
    });
  }

  submit(): void {
    const country = this.countries.find((c: Country) => c.name === this.form.value.country);
    const sight = new SightseeingPoint(
      this.form.value.name,
      this.form.value.longitude,
      this.form.value.latitude,
      country,
      this.form.value.description,
      this.form.value.color
    );

    if (this.currentSight) {
      this.edit(sight);
    } else {
      this.addNew(sight);
    }
  }

  showError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return (control.touched && control?.errors?.[errorName]);
  }
}

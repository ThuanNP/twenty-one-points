import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
import { BloodPressureService } from './blood-pressure.service';

@Component({
  templateUrl: './blood-pressure-delete-dialog.component.html'
})
export class BloodPressureDeleteDialogComponent {
  bloodPressure: IBloodPressure;

  constructor(
    protected bloodPressureService: BloodPressureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bloodPressureService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'bloodPressureListModification',
        content: 'Deleted an bloodPressure'
      });
      this.activeModal.dismiss(true);
    });
  }
}

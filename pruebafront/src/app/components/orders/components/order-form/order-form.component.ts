import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamsService } from 'src/app/core/services/exams/exams.service';
import { ExamModel } from 'src/app/core/Models/Exams/ExamsModel';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { Router } from '@angular/router';
import { PatientModel } from 'src/app/core/Models/Patient/PatientModel';
import { PatientService } from 'src/app/core/services/patient/patient.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  submitted = false;
  exams: ExamModel[] = [];
  loadingExams = false;
  errorExams = '';
  patients: PatientModel[] = [];
  loadingPatients = false;
  errorPatients = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ordersService: OrdersService,
    private examsService: ExamsService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      idPatient: ['', Validators.required],
      dateCare: ['', Validators.required],
      exams: [[], Validators.required]
    });

    this.loadExams();
    this.loadPatients();
  }

  loadPatients(): void {
    this.loadingPatients = true;
    this.patientService.listPatients().subscribe({
      next: (res) => {
        if (res.success) {
          this.patients = res.data;
        } else {
          this.errorPatients = 'No se pudieron obtener los pacientes.';
        }
        this.loadingPatients = false;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        this.errorPatients = 'Error al comunicarse con el servidor.';
        this.loadingPatients = false;
      }
    });
  }

  noFutureDateValidator(control: any) {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputDate > today) {
      return { futureDate: true };
    }
    return null;
  }

  loadExams(): void {
    this.loadingExams = true;
    this.examsService.listExams().subscribe({
      next: (res) => {
        if (res.success) {
          this.exams = res.data;
        } else {
          this.errorExams = 'No se pudieron obtener los exámenes.';
        }
        this.loadingExams = false;
      },
      error: (err) => {
        console.error('Error al cargar exámenes:', err);
        this.errorExams = 'Error al comunicarse con el servidor.';
        this.loadingExams = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.orderForm.invalid) {
      return;
    }

    const order = this.orderForm.value;
    console.log('Enviando orden:', order);

    this.ordersService.createOrder(order).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Orden creada con éxito');
          this.router.navigate(['/orders']);
        } else {
          alert('No se pudo crear la orden');
        }
      },
      error: (err) => {
        console.error('Error al crear orden:', err);
        alert('Ocurrió un error al crear la orden');
      }
    });
  }

  get fc() {
    return this.orderForm.controls;
  }

  get fv() {
    return this.orderForm.value;
  }
}

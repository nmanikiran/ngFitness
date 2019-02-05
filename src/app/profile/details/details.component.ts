import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  auth: any;
  profileFrom: FormGroup;
  profile: any;
  maxDate: Date = new Date();
  selectedAddress = {};
  percentage: number | undefined;
  profileUrl: any;
  constructor(
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.auth = this.authService.auth;
    this.profileFrom = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      email: [
        { value: this.auth.email, disabled: true },
        [Validators.required, Validators.email]
      ],
      address: ['', Validators.required],
      bio: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    const routeParams = this.activeRoute.snapshot.params;

    this.profileService.getProfile(routeParams.id).subscribe(result => {
      if (result.length) {
        this.profile = result[0];
        this.profileUrl = result[0].profileUrl;
        const birthday = new Date(result[0].birthday);
        const address = result[0].address['formatted_address'] || '';
        this.selectedAddress = result[0].address;
        this.profileFrom.setValue({
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          gender: result[0].gender,
          birthday,
          email: result[0].email,
          address,
          bio: result[0].bio
        });
      }
    });
  }
  save() {
    const updatedProfile = { ...this.profileFrom.value };
    updatedProfile.birthday = new Date(updatedProfile.birthday).toJSON();
    updatedProfile.address = this.selectedAddress || {};
    updatedProfile.authId = this.auth.uid;
    updatedProfile.email = updatedProfile.email || this.auth.email;
    updatedProfile.profileUrl = this.profileUrl || '';
    if (this.profile && this.profile.id) {
      this.profileService.updateProfile(this.profile.id, updatedProfile);
    } else {
      this.profileService.addProfile(updatedProfile);
    }
  }
  onSelect(address: any) {
    this.selectedAddress = address;
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `/profilepics/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.percentageChanges().subscribe((res: number | undefined) => {
      this.percentage = res;
    });

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(res => {
            this.profileUrl = res;
            this.save();
          });
        })
      )
      .subscribe();
  }
}

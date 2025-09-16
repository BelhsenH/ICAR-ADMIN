import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {Router} from "@angular/router";
import {HOME_BASE_URL} from "../../../../shared/constants/urls.constant";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {User} from "../../../../shared/models/user/user.model";
import {Role} from "../../../../shared/models/authentication/role-enum.model";
import {AccountDisabler} from "../../../../shared/models/user/suspension.model";
import {MessageService} from "primeng/api";
import {AuthenticationService} from "../../../../core/auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password!: string;
  authenticationForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });

  isAuthenticated = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private messageService: MessageService,
    public layoutService: LayoutService,
    public authenticationService: AuthenticationService,
  ) {
  }

  async ngOnInit() {
    /*        this.authenticationService.login({email: 'admin', password: 'teamSyst2023'}).subscribe(
                async (response) => {
                    await this.router.navigateByUrl(HOME_BASE_URL);
                },
                async (error) => {
                    console.log(error);
                }
            );*/

    this.isAuthenticated = await this.authenticationService.isAuthenticated;
    if (this.isAuthenticated) {
      await this.router.navigateByUrl(HOME_BASE_URL);
    }
  }

  async onSubmit(resetForm: FormGroupDirective) {
    /*      if (await this.authenticationService.isInBrowserLoggedIn()) {
              this.authenticationForm.reset();
              resetForm.resetForm();
              await this.router.navigateByUrl(HOME_BASE_URL).then(() => window.location.reload());
              return;
          }*/
    if (!this.authenticationForm.valid) {
      return;
    }

    this.authenticationService.login({
      email: this.authenticationForm.get(['email'])?.value,
      password: this.authenticationForm.get(['password'])?.value
    }).subscribe({
        next: async (res) => {
          // @ts-ignore
          const user: User = res.body!.data;
          if (!user.enabled || user.role !== Role.ADMIN) {
            const reason: any = user.accountSuspension!.disabler == AccountDisabler.SYSTEM ? user.accountSuspension!.suspensionSystemReason
              : user.accountSuspension!.disabler == AccountDisabler.ADMIN ? user.accountSuspension!.suspensionAdminReason
                : user.accountSuspension!.suspensionUserReason;
            const errorText: string = !user.enabled ? "Your account is deactivated" + reason : "You do not have access to this platform" + reason;
            this.messageService.add({
              severity: 'error',
              summary: 'Account disabled',
              detail: errorText,
              life: 3000,
            });
            return;
          }
          this.authenticationForm.reset();
          resetForm.resetForm();
          await this.router.navigateByUrl(HOME_BASE_URL);
        },
        error: async (error) => {
          if (error.source === 'keycloak' && error.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: "Login Error",
              detail: "Bad credentials",
              life: 2000,
            });
          } else if (error.source === 'keycloak' && error.status === 400 && error.description === 'Account disabled') {
            this.messageService.add({
              severity: 'error',
              summary: "Error",
              detail: "Your account is disabled",
              life: 2000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: "Error",
              detail: "Your account is disabled",
              life: 2000,
            });
          }
        }
      }
    );
  }
}

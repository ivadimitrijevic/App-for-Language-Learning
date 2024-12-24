import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';


import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserService } from './user/services/user.service';
import { userFeature } from './user/store/reducers/user.reducer';
import { UserEffects } from './user/store/effects/user.effects';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './user/pages/register-page/register-page.component';
import { ProfilePageComponent } from './user/pages/profile-page/profile-page.component';
import { LoginPageComponent } from './user/pages/login-page/login-page.component';
import { LanguageService } from './language/services/language.service';
import { LanguageLevelService } from './language/services/language-level.service';
import { TypeOfLearningService } from './language/services/type-of-learning.service';
import { LanguageEffects } from './language/store/effects/language.effects';
import { LanguageLevelEffects } from './language/store/effects/language-level.effects';
import { TypeOfLearningEffects } from './language/store/effects/type-of-learning.effects';
import { languageFeature } from './language/store/reducers/language.reducer';
import { typeOfLearningFeature } from './language/store/reducers/type-of-learning.reducer';
import { languageLevelFeature } from './language/store/reducers/language-level.reducer';
import { LearnersPageComponent } from './user/pages/learners-page/learners-page.component';
import { FriendService } from './friend/services/friend.service';
import { FriendEffects } from './friend/store/effects/friend.effects';
import { friendFeature } from './friend/store/reducers/friend.reducer';
import { ratingFeature } from './rating/store/reducers/rating.reducer';
import { RatingEffects } from './rating/store/effects/rating.effects';
import { RatingService } from './rating/services/rating.service';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { NotificationService } from './notifications/services/notification.service';
import { NotificationEffects } from './notifications/store/effects/notification.effects';
import { notificationFeature } from './notifications/store/reducers/notification.reducer';
import { EventsPageComponent } from './event/pages/events-page/events-page.component';
import { eventFeature } from './event/store/reducers/event.reducer';
import { EventService } from './event/services/event.service';
import { EventEffects } from './event/store/effects/event.effects';
import { ChatPageComponent } from './chat/pages/chat-page/chat-page.component';
import { PusherService } from './chat/services/pusher.service';
import { chatFeature } from './chat/store/reducers/chat.reducer';
import { ChatService } from './chat/services/chat.service';
import { ChatEffects } from './chat/store/effects/chat.effects';
import { AutoScrollDirective } from './chat/components/auto-scroll';
import { UsersPageComponent } from './user/pages/users-page/users-page.component';
import { LanguageLevelPageComponent } from './language/pages/language-level-page/language-level-page.component';
import { TypeOfLearningPageComponent } from './language/pages/type-of-learning-page/type-of-learning-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'learners',
    component: LearnersPageComponent,
  },
  {
    path: 'events',
    component: EventsPageComponent,
  },
  {
    path: 'chat',
    component: ChatPageComponent,
  },
  {
    path: 'users',
    component: UsersPageComponent,
  },
  {
    path: 'language-levels',
    component: LanguageLevelPageComponent,
  },
  {
    path: 'types-of-learning',
    component: TypeOfLearningPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({}),
      StoreModule.forFeature(userFeature),
      StoreModule.forFeature(languageFeature),
      StoreModule.forFeature(typeOfLearningFeature),
      StoreModule.forFeature(languageLevelFeature),
      StoreModule.forFeature(friendFeature),
      StoreModule.forFeature(ratingFeature),
      StoreModule.forFeature(notificationFeature),
      StoreModule.forFeature(eventFeature),
      StoreModule.forFeature(chatFeature),
      EffectsModule.forRoot([]),
      EffectsModule.forFeature([UserEffects, LanguageEffects, LanguageLevelEffects, TypeOfLearningEffects, FriendEffects,
                                            RatingEffects, NotificationEffects, EventEffects, ChatEffects]),
      UserService,
      LanguageService,
      LanguageLevelService,
      TypeOfLearningService,
      FriendService,
      RatingService,
      NotificationService,
      EventService,
      PusherService,
      ChatService,
      AutoScrollDirective,
    ),
    provideStore({ [userFeature.name]: userFeature.reducer }),
    // provideDevtools({
    //   maxAge: 25,
      // logOnly: environment.production,
    // }),
  ]
});

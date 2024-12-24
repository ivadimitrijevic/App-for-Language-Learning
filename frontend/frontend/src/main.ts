import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { routes } from './app/app.routes';
import { userFeature } from './app/user/store/reducers/user.reducer';
import { UserEffects } from './app/user/store/effects/user.effects';
import { LanguageEffects } from './app/language/store/effects/language.effects';
import { LanguageLevelEffects } from './app/language/store/effects/language-level.effects';
import { TypeOfLearningEffects } from './app/language/store/effects/type-of-learning.effects';
import { languageFeature } from './app/language/store/reducers/language.reducer';
import { typeOfLearningFeature } from './app/language/store/reducers/type-of-learning.reducer';
import { languageLevelFeature } from './app/language/store/reducers/language-level.reducer';
import { AppComponent } from './app/app.component';
import { UserService } from './app/user/services/user.service';
import { LanguageService } from './app/language/services/language.service';
import { LanguageLevelService } from './app/language/services/language-level.service';
import { TypeOfLearningService } from './app/language/services/type-of-learning.service';
import { friendFeature } from './app/friend/store/reducers/friend.reducer';
import { FriendEffects } from './app/friend/store/effects/friend.effects';
import { FriendService } from './app/friend/services/friend.service';
import { ratingFeature } from './app/rating/store/reducers/rating.reducer';
import { RatingService } from './app/rating/services/rating.service';
import { RatingEffects } from './app/rating/store/effects/rating.effects';
import { notificationFeature } from './app/notifications/store/reducers/notification.reducer';
import { NotificationEffects } from './app/notifications/store/effects/notification.effects';
import { NotificationService } from './app/notifications/services/notification.service';
import { eventFeature } from './app/event/store/reducers/event.reducer';
import { EventService } from './app/event/services/event.service';
import { EventEffects } from './app/event/store/effects/event.effects';
import { PusherService } from './app/chat/services/pusher.service';
import { chatFeature } from './app/chat/store/reducers/chat.reducer';
import { ChatService } from './app/chat/services/chat.service';
import { ChatEffects } from './app/chat/store/effects/chat.effects';
import { AutoScrollDirective } from './app/chat/components/auto-scroll';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    // provideStore(),
    provideStore({ [userFeature.name]: userFeature.reducer }),
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      StoreModule.forFeature(userFeature),
      StoreModule.forFeature(languageFeature),
      StoreModule.forFeature(typeOfLearningFeature),
      StoreModule.forFeature(languageLevelFeature),
      StoreModule.forFeature(friendFeature),
      StoreModule.forFeature(ratingFeature),
      StoreModule.forFeature(notificationFeature),
      StoreModule.forFeature(eventFeature),
      StoreModule.forFeature(chatFeature),
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
  ]
});

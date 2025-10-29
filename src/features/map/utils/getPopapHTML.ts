import type { User } from "../../users/types";
import { GENDER_EMOJIS, INTEREST_EMOJIS } from "../constants";

export const getPopapHTML = (user: User) => {
  const { gender, name, surname, age, description, interests } = user;
  return (
    `
        <div class="user-popup">
          <div class="marker-header">
            ${gender ? `<span class="marker-gender">${GENDER_EMOJIS[gender]}</span>` : ''}
            <h3 class="marker-title">${name} ${surname ?? ''}</h3>
          </div>
          ${age ? `<div class="marker-age">${age} y.o.</div>` : ''}
          ${description
      ? `<div class="marker-description">
                  <h3 class="marker-description-title"><span class="marker-description-title-icon">💬</span> About me</h3>
                  <p class="marker-description-text">${description}</p>
                </div>`
      : ''
    }
          <div class="marker-interests">
            <h3 class="marker-interests-title">
              <span class="marker-interests-title-icon">🎯</span> Interests
            </h3>
            <ul class="marker-list">
              ${interests
      .map(
        (i) =>
          `<li class="marker-chip" data-interest="${i}">
                      <span class="chip-emoji">${INTEREST_EMOJIS[i] ?? ''}</span>
                      <span class="chip-text">${i}</span>
                    </li>`
      )
      .join('')}
            </ul>
          </div>
        </div>
      `)
}
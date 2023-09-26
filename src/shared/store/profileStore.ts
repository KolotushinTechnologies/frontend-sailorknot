import { Store, registerInDevtools } from "pullstate"
import { GetUserResponse } from "../http/services/authService/types/getUser"
import { ProfileProps } from "../types"

/**
 * У вас есть интерфейс GetUserResponse, который представляет структуру объекта с данными о пользователе. Вы хотите создать новый интерфейс, который будет расширять GetUserResponse, но позволит свойству data быть каким-то значением или null.
  Проблема заключается в том, что TypeScript не позволяет сделать свойство в расширяющем интерфейсе более "произвольным" (например, сделать его nullable), чем в базовом интерфейсе.
  Чтобы решить эту проблему, мы используем маппированный тип (mapped type). Вот как это работает:
  Мы определяем интерфейс GetUserResponse, который представляет структуру объекта с данными о пользователе. Этот интерфейс у вас уже есть.
  Затем мы создаем новый тип NullableUserResponse, который будет иметь ту же структуру, что и GetUserResponse, но с возможностью свойства data быть либо GetUserResponse["data"], либо null.
  Мы используем маппированный тип для этого. Мы перебираем ключи K из GetUserResponse и проверяем каждый ключ: если ключ равен "data", то мы разрешаем свойству data быть или GetUserResponse["data"], или null. Для всех остальных ключей мы сохраняем тот же тип, что и в GetUserResponse.
  Таким образом, этот подход позволяет сделать свойство data nullable, сохраняя при этом типы всех остальных свойств такими же, как в исходном интерфейсе.
 */


export const ProfileStore = new Store<ProfileProps>({
  data: null,
})

export const profileStoreGetUser = (data: ProfileProps) => {
  ProfileStore.update((store) => {
    store.data = data.data
  })
}

registerInDevtools({
  ProfileStore,
})

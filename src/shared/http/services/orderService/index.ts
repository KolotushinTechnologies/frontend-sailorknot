import { AxiosResponse } from "axios"
import { http } from "../../index"
import { GetAllAdsResponse } from "./types/getAllAds"
import { CreateAdRequest, CreateAdResponse } from "./types/createAd"
import { GetAllAgentAdsResponse } from "./types/getAllAgentAds"
import { GetAgentAdByIdResponse } from "./types/getAgentAdById"
import { SearchAgentAdsResponse } from "./types/searchAgentAds"
import { GetAdByIdResponse } from "./types/getAdById"
import { UpdateAdByIdRequest } from "./types/updateAdById"
import { DeleteAdByIdResponse } from "./types/deleteAdById"
import { CreateRespondBody, CreateRespondParams, CreateRespondResponse } from "./types/createRespond"
import { GetUserResponsesParams, GetUserResponsesResponse } from "./types/getUserResponses"
import { GetAgentResponsesParams, GetAgentResponsesResponse } from "./types/getAgentResponses"
export class OrderService {
  // static async getAll() {
  //   return await http.get<GetAllResponse[]>("api/ads/all")
  // }

  // static getOne(orderId: string | number) {
  //   // return await http.get<GetOneResponse>(`api/orders/${orderId}`)
  //   return demoOrders.find((search) => `${search.id}` === `${orderId}`)
  // }

  // static deleteOne(orderId: string | number) {
  //   // return await http.get<GetOneResponse>(`api/orders/${orderId}`)
  //   return demoOrders.find((search) => `${search.id}` === `${orderId}`)?.id
  // }

  /**
   * @param title Заголовок
     @param companyName Название компании
     @param ship Судно
     @param typeOfFishing Вид промысла
     @param flightDuration Продолжительность рейса
     @param jobTitle Должность
     @param salaryPerMonth Заработная плата
     @param description Описание
   * @descr Create a New Ad. Запрос доступен для Агентов и Администраторов 
   */
  static async createAd(data: CreateAdRequest): Promise<AxiosResponse<CreateAdResponse>> {
    return await http.post(`api/ads/create-ad`, data)
  }
  /**
   * @descr Create respond to ad by ID. Запрос доступен для Пользователей и Администраторов
   */
  static async createRespond({ ad_id }: CreateRespondParams, data: CreateRespondBody): Promise<AxiosResponse<CreateRespondResponse>> {
    return await http.post(`api/ads/create-respond/${ad_id}`, data)
  }
  /**
   * @descr Get user responses all. Запрос доступен для Пользователей и Администраторов
   */
  static async getUserResponses({ ad_id }: GetUserResponsesParams): Promise<AxiosResponse<GetUserResponsesResponse[]>> {
    return await http.get(`api/ads/user-responses/all/${ad_id}`)
  }
  /**
   * @descr Get agent responses all. Запрос доступен для Агентов и Администраторов
   */
  static async getAgentResponses({ ad_id }: GetAgentResponsesParams): Promise<AxiosResponse<GetAgentResponsesResponse[]>> {
    return await http.get(`api/ads/agent-responses/all/${ad_id}`)
  }
  // Get all agent ads
  static async getAllAgentAds(): Promise<AxiosResponse<GetAllAgentAdsResponse[]>> {
    return await http.get(`api/ads/agent-all`)
  }

  // Get agent ad by ID
  static async getAgentAdById(adId: string): Promise<AxiosResponse<GetAgentAdByIdResponse>> {
    return await http.get(`api/ads/agent/${adId}`)
  }

  // Search Agent Ads
  static async searchAgentAds(content: string): Promise<AxiosResponse<SearchAgentAdsResponse[]>> {
    return await http.post(`api/ads/searching/agent-all`, {
      content,
    })
  }

  // Get all ads (for Users and SuperAdmin)
  static async getAllAds(): Promise<AxiosResponse<GetAllAdsResponse[]>> {
    return await http.get(`api/ads/all`)
  }

  // Get ad by ID (for Users and SuperAdmin)
  static async getAdById(adId: string): Promise<AxiosResponse<GetAdByIdResponse>> {
    return await http.get(`api/ads/${adId}`)
  }

  // Update Information For ad by ID
  // Запрос доступен для Агентов и Администраторов
  static async updateAdById(adId: string, data: UpdateAdByIdRequest): Promise<AxiosResponse<UpdateAdByIdRequest>> {
    return await http.put(`api/ads/update/${adId}`, data)
  }

  // Delete ad by ID
  /**
   * @descr Запрос доступен для Агентов и Администраторов
   */
  static async deleteAdById(adId: string): Promise<AxiosResponse<DeleteAdByIdResponse>> {
    return await http.delete(`api/ads/${adId}`)
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly apiKey = '16e4c82cddmsh9b58dc6b829e165p10e0aejsn862224a79232';
  private readonly baseUrl = 'https://instagram-scraper-api2.p.rapidapi.com/v1';

  async getHighlightInfo(highlightId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/highlight_info`, {
        params: {
          highlight_id: highlightId,
        },
        headers: {
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
          'x-rapidapi-key': this.apiKey,
        },
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Highlight not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error fetching Instagram highlight data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

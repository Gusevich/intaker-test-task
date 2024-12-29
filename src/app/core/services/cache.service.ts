import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface CachedData {
  timestamp: number;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [key: string]: CachedData } = {};
  private readonly CACHE_DURATION: number = 3600000;

  getData(key: string, fetcher: () => Observable<any>): Observable<any> {
    const cached: CachedData = this.cache[key];
    const now: number = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return of(cached.data);
    }

    return new Observable((observer) => {
      fetcher().subscribe({
        next: (data) => {
          this.cache[key] = {
            timestamp: now,
            data,
          };
          observer.next(data);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  clearCache(): void {
    this.cache = {};
    console.log('Cache cleared.');
  }

  clearCacheForKey(key: string): void {
    delete this.cache[key];
    console.log(`Cache cleared for key: ${key}`);
  }
}

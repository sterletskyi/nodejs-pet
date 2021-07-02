import { ApiProperty } from '@nestjs/swagger';

export class FeaturesByKgs22ResponseDto {
  @ApiProperty({
    example: {
      centrality: {
        country_avg: 25.16,
        country: 25.21,
        city: 25.09,
        city_avg: 23.05,
        plz: 66.49,
        plz_avg: 33.46,
      },
      social_status: {
        country: 61.59,
        city_avg: 52.57,
        country_avg: 55,
        plz: 95.98,
        city: 63.06,
        plz_avg: 49.09,
      },
      young_population: {
        plz_avg: 34.41,
        city: 26.63,
        country: 23.75,
        city_avg: 26.12,
        country_avg: 17.39,
        plz: 29.68,
      },
      family_friendliness: {
        city: 0,
        city_avg: 2.67,
        country: 0,
        plz_avg: 7.16,
        country_avg: 0.46,
        plz: 0,
      },
      urban: {
        plz_avg: 49.44,
        city: 20.35,
        country: 20.35,
        city_avg: 17.96,
        plz: 70.45,
        country_avg: 8.82,
      },
      nature: {
        country: 1,
        country_avg: 9.45,
        city: 1.09,
        plz_avg: 11.09,
        plz: 1.76,
        city_avg: 9.62,
      },
    },
  })
  centrality: {
    country_avg: number;
    country: number;
    city: number;
    city_avg: number;
    plz: number;
    plz_avg: number;
  };
  social_status: {
    country_avg: number;
    country: number;
    city: number;
    city_avg: number;
    plz: number;
    plz_avg: number;
  };
  young_population: {
    country_avg: number;
    country: number;
    city: number;
    city_avg: number;
    plz: number;
    plz_avg: number;
  };
  family_friendliness: {
    country_avg: number;
    country: number;
    city: number;
    city_avg: number;
    plz: number;
    plz_avg: number;
  };
  urban: {
    country_avg: number;
    country: number;
    city: number;
    city_avg: number;
    plz: number;
    plz_avg: number;
  };
  nature: {
    country_avg: number;
    country: number;
    city: number;
    city_avg: number;
    plz: number;
    plz_avg: number;
  };
}

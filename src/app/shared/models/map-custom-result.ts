import { ISuggestionRow } from 'ngx-custom-google-places-autocomplete';

export interface MapCustomResult extends ISuggestionRow {
    img: string;
    value: string;
    icon: string;
  }
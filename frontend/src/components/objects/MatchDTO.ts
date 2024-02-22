import {MetadataDTO} from "./MetadataDTO";

export function MatchDTO(data) {
    this.metadata = new MetadataDTO(data.metadata);
    this.info = new InfoDTO(data.info);
}
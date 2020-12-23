import { DocumentID } from './sanity';

export type Processor<T = any> = (documentID: DocumentID) => T;
export type Processors = Processor[];

export interface ICoreState {
  name: string,
  members: Array<Member>
}

export interface Tag {
  tagName: string;
  keyWords: Array<string>;
}
export interface Member {
  name: string;
  color: string;
}

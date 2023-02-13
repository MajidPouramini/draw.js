import { Component } from '../models';

export interface Cloneable {
  clone(): Component;
  clonePropertiesFrom(cloneSource: Component): void;
}

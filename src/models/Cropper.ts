import {Component} from "./Component";

export class Cropper {
    constructor(private component: Component) {
    }

    crop() {
        console.log(this.component, 'cropped')
    }
}
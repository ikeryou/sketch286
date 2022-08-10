import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";
import { Color } from "three/src/math/Color";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _id:number;
  private _item:Array<Item> = [];
  private _colors:Array<Color> = []

  constructor(opt:any) {
    super(opt)

    // 必要カラー
    this._makeColors();

    this._c = 1;
    this._id = opt.id;

    const num = Conf.instance.ITEM_NUM;
    for(let i = 0; i < num; i++) {
      const itemEl = document.createElement('span');
      itemEl.classList.add('item');
      this.getEl().append(itemEl);

      const item = new Item({
        id:i,
        el:itemEl,
      });
      this._item.push(item);
    }

    this._change();
  }


  protected _change(): void {
    const color = new Color(Util.instance.randomArr(this._colors));
    // const color2 = new Color(Util.instance.randomArr(this._colors));
    const t = Util.instance.randomArr('ACDEFGHIKLMNOPRSTUVWXYZ0123456789??'.split(''));

    this._item.forEach((val) => {
      val.change({
        text:t,
        color:color,
        color2:new Color(0xff0000)
      })
    })

    const bgColor = new Color(1 - color.r, 1 - color.g, 1 - color.b);
    Tween.instance.set(document.body, {
      backgroundColor:bgColor.getStyle(),
    })
  }


  protected _update(): void {
    super._update();

    if(this._c % (60 * 2) == 0) {
      this._change();
    }

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const ang = this._c * Mouse.instance.easeNormal.x * 0.25 + (360 / Conf.instance.CON_NUM) * this._id;
    const rad = Util.instance.radian(ang);
    const radius = Math.min(sw, sh) * 0.25;

    let x = sw * 0.5 + Math.sin(rad) * radius * 0;
    let y = sh * 0.5 + Math.cos(rad) * radius * 0;

    Tween.instance.set(this.getEl(), {
      x: x,
      y: y,
    })
  }


  //
  // ------------------------------------
  private _makeColors():void {
    this._colors = []

    const colA = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))
    const colB = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))
    const colC = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))
    const colD = new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))

    for(let i = 0; i < 100; i++) {
        const colE = colA.clone()
        this._colors.push(colE.lerp(colB, Util.instance.random(0, 1)))

        const colF = colB.clone()
        this._colors.push(colF.lerp(colC, Util.instance.random(0, 1)))

        const colG = colC.clone()
        this._colors.push(colG.lerp(colD, Util.instance.random(0, 1)))

        const colH = colD.clone()
        this._colors.push(colH.lerp(colA, Util.instance.random(0, 1)))

        // this._colors.push(new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1)))
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/timer';
// import 'rxjs/add/observable/range';
// import 'rxjs/add/opertor/zip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private v = [1, 2, 3, 4, 5];
  private w = [0, 2, 4, 6, 8];
  private z = [1, 5, 4, 2, 7, 0];
  private r = [];

  public ngOnInit() {
    this.zipDemo();
  }

  private frutsel() {
    console.log('v: ' + this.v);
    console.log('w: ' + this.w);
    console.log(this.v.join(' en '));
    console.log(this.v.map(x => x * x).reduce((x, y) => x + y));
    console.log('v groter dan 0: ' + this.v.every(x => x > 0));
    console.log('w groter dan 0: ' + this.w.every(x => x > 0));
    console.log('elementjes van v die ook in w zitten: ');
    console.log(this.v.filter(x => this.w.some(y => y === x)));
    console.log(this.v.filter(x => this.w.includes(x)));

    const kwadraad = this.v.map(x => x * x);
    console.log(kwadraad.reduce((x, y) => x - y));
    console.log(kwadraad.reduceRight((x, y) => x - y));
    console.log(kwadraad.reverse().reduce((x, y) => x - y));

    console.log(this.z.sort());
    console.log(this.z.sort((x, y) => y - x));

    const lijst1 = this.maakDingen(10);
    const lijst2 = this.maakDingen(10);
    console.log(lijst1.filter(x => lijst2.some(x2 => x2.getal === x.getal)).toString());
    console.log(lijst1.filter(x => lijst2.map(x2 => x2.getal).includes(x.getal)).toString());

    const lijst3 = this.maakDingen(50);
    const verz3 = this.maakDingenVerzameling(lijst3);
    console.log('Lijst van ' + lijst3.length + ', verzameling van ' + verz3.size);
  }
  private maakDingen(aantal: number): Array<ding> {
    const lijst = new Array<ding>();
    for (let i = 0; i < aantal; i++) {
      lijst.push(new ding(i, Math.round(100 * Math.random()), null));
    }
    // console.log(lijst.toString());
    return lijst;
  }

  private maakDingenVerzameling(dingen: Array<any>): Set<any> {
    const verzameling = new Set<any>();
    dingen.forEach(ding => verzameling.add(ding));
    return verzameling;
  }

  private wandel(lijst: Array<ding>) {
    const qqlq = lijst.entries();
    let ding = qqlq.next();
    while (ding) {
      console.log(ding.toString());
      ding = qqlq.next();
    }
  }

  private zipDemo() {
    // console.log(JSON.stringify(new Date()));
    // Observable.timer(500).subscribe(x => console.log(x));
    let t1 = Observable.interval(5000).take(5);
    let t2 = Observable.interval(2000).take(10);
    // let r1 = Observable.range(0, 3);
    // r1.subscribe(x => console.log('r1: ' + x));
    // let r2 = Observable.range(5, 5);
    // r2.subscribe(x => console.log('r2: ' + x));
    t1.subscribe(x => console.log('t1: ' + x));
    t2.subscribe(x => console.log('t2: ' + x));

    t1.zip(t2, (links, rechts) => 'zz: ' + links + ' - ' + rechts).subscribe(x => console.log(x));
    t1.combineLatest(t2, (l, r) => 'cl: ' + l + ' - ' + r).subscribe(x => console.log(x));
    Observable.merge(t1, t2).subscribe(x => console.log('mg: ' + x));
    //Generate values a,b,c,d,e,f 
    // var chars = Observable.Interval(TimeSpan.FromMilliseconds(150))
    //   .Take(6)
    //   .Select(i => Char.ConvertFromUtf32((int)i + 97));
    // //Zip values together
    // nums.Zip(chars, (lhs, rhs) => new { Left = lhs, Right = rhs })
    //   .Dump("Zip");
  }
}



export class ding implements dingetje {
  constructor(public id: number, public getal: number, public wat: string) { }
  public toString(): string {
    return JSON.stringify(this);
  }
  public getalPlusId() {
    return this.id + this.getal;
  }
}

export interface dingetje {
  id: number;
  getal: number;
  wat: string;
  toString(): string;
  getalPlusId(): number;
}

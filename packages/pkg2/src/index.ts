import { pkg1 } from '@chuche-monitor/pkg1';

function pkg2() {
    pkg1();
    console.log("I am pkg2");
}

export default pkg2;
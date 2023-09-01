const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createKnight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }
}

const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 80,
        maxLife: 80,
        attack: 15,
        defense: 3
    }
}

const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Little Monster',
        life: 40,
        maxLife: 40,
        attack: 8,
        defense: 5
    }
}

const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 110,
        maxLife: 110,
        attack: 11,
        defense: 6
    }
}

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.fighter1El.querySelector('.atkButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));

        this.update();
    },
    update(){
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(0)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(0)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    },
    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Chutando cachorro morto');
            return;
        }

        const attackFactor = (Math.random() * 0.8 + 0.6).toFixed(0);
        const defenseFactor = (Math.random() * 2.5).toFixed(0);

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        const actualAttackAttacked = attacked.attack * attackFactor;
        const actualDefenseAttacking = attacking.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack - actualDefense;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            log.addMessage(`${attacking.name} casou ${actualAttack.toFixed(0) - actualDefense.toFixed(0)} de dano a ${attacked.name}.`);
        } else {
            log.addMessage(`${attacked.name} defendeu.`);
        }
        
        this.update();

        if(attacked.life <= 0) {
            log.addMessage(`${attacked.name} morreu.`);
            return;
        }
        
        if(actualAttackAttacked >  actualDefenseAttacking){
            attacking.life -= actualAttackAttacked - actualDefenseAttacking;
            attacking.life = attacking.life < 0 ? 0 : attacking.life;
            log.addMessage(`${attacked.name} casou ${actualAttackAttacked.toFixed(0) - actualDefenseAttacking.toFixed(0)} de dano a ${attacking.name}.`);
        
        } else {
            log.addMessage(`${attacking.name} defendeu.`);
        }
        if(attacking.life <= 0) {

            log.addMessage(`${attacking.name} morreu.`);
        }

        this.update();
    }
}

const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    },
    render() {
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for(let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`;
            rolarParaUltimaLinha(logEl);
        }
    }
}

function rolarParaUltimaLinha(El) {
    El.scrollTop = El.scrollHeight;
}
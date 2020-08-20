const chai = require('chai');
const expect = chai.expect;

const Deck = require('../src/Deck');
const Turn = require('../src/Turn');
const Card = require('../src/Card');
const Round = require('../src/Round');

describe('Round', () => {
  let card1
  let card2
  let card3
  let deck
  let round
  beforeEach(() => {
     card1 = new Card(
      1,
      'What is Robbie\'s favorite animal',
      ['sea otter', 'pug', 'capybara'],
      'sea otter');

     card2 = new Card(
      14, 'What organ is Khalid missing?',
      ['spleen', 'appendix', 'gallbladder'],
      'gallbladder');

     card3 = new Card(
      12,
      'What is Travis\'s favorite stress reliever?',
      ['listening to music', 'watching Netflix',
      'playing with bubble wrap'],
      'playing with bubble wrap');

      deck = new Deck([card1, card2, card3]);

      round = new Round(deck);
});

  it('should be a function', () => {
    const round = new Round();

    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', () => {
    const round = new Round();

    expect(round).to.be.an.instanceof(Round);
  });

  it('when a guess is made, should update the card to a new card', () => {
      expect(round.returnCurrentCard()).to.equal(card1);
      expect(round.turnCount).to.equal(0);

      round.takeTurn('sea otter');

      expect(round.returnCurrentCard()).to.equal(card2);
      expect(round.turnCount).to.equal(1);
  });

  it('should update the card to a new card even if incorrect guess', () => {
      expect(round.returnCurrentCard()).to.equal(card1);

      round.takeTurn('cow');

      expect(round.returnCurrentCard()).to.equal(card2);
  });

  it('should store only incorrect guesses', () => {
      expect(round.returnCurrentCard()).to.equal(card1);

      round.takeTurn('cow');
      round.takeTurn('hippo');
      round.takeTurn('playing with bubble wrap');

      expect(round.incorrectGuesses.length).to.equal(2);
  });

  it('should store incorrect guesses by id', () => {
      expect(round.returnCurrentCard()).to.equal(card1);

      round.takeTurn('cow');
      round.takeTurn('hippo');

      expect(round.incorrectGuesses).to.deep.equal([1,14]);
  });

  it('should give feedback on guess', () => {
      expect(round.takeTurn('cow')).to.equal('incorrect!');
      expect(round.takeTurn('gallbladder')).to.equal('correct!');
  });

  it('should calculate the percent of correct answers', () => {
    round.takeTurn('sea otter');
    round.takeTurn('gallbladder');
    round.takeTurn('pizza');

    expect(round.calculatePercentCorrect()).to.equal('67%');
  });

  it('should give a specical message when game is over', () => {
    round.takeTurn('sea otter');
    round.takeTurn('gallbladder');
    round.takeTurn('pizza');

    expect(round.endRound()).to.equal
      ('** Round over! ** 67% of the questions correctly!');
  });
});

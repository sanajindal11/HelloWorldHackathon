class Assignment {
  constructor(name, score, possiblePoints, feedback) {
    this.name = name;
    this.score = score;
    this.possiblePoints = possiblePoints;
    this.feedback = feedback;
  }

  // Getters
  getName() {
    return this.name;
  }

  getScore() {
    return this.score;
  }

  getPossiblePoints() {
    return this.possiblePoints;
  }

  getPercentage() {
    if (this.possiblePoints === 0) return 0;
    return (this.score / this.possiblePoints) * 100;
  }

  getFeedback() {
    return this.feedback;
  }

  // Setters
  setScore(score) {
    if (score > this.possiblePoints) {
      throw new Error("Score cannot exceed possible points.");
    }
    this.score = score;
  }

  setFeedback(feedback) {
    this.feedback = feedback;
  }

  // String representation
  toString() {
    return `${this.name}: ${this.score}/${this.possiblePoints} (${this.getPercentage().toFixed(2)}%)`;
  }
}

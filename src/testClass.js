export default function Tester(name, yearsOfExperience) {
  this.name = name;
  this.yearsOfExperience = yearsOfExperience;
}

Tester.prototype.getHourlyRate = function getHourlyRate() {
  return this.yearsOfExperience * 5;
};

Tester.prototype.getSalary = function getSalary() {
  return this.getHourlyRate() * 165;
};

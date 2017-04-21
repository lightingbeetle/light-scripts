class Flags {
  constructor() {
    this.flags = {
      isBuild: false,
      isWatch: false,
      lintFix: true,
    };

    this.getFlag = this.getFlag.bind(this);
    this.setFlag = this.setFlag.bind(this);
  }

  getFlag(flag) {
    return this.flags[flag];
  }

  setFlag(flags) {
    this.flags = Object.assign({}, this.flags, flags);
  }
}

module.exports = new Flags();

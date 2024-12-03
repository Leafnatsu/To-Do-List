export function dontdothat(deleteCount: number): string {

    switch (deleteCount) {

      case 1:
        return "Really? Ahh, Nope!";
      case 2:
        return "Nice Try, But You Can't.";
      case 3:
        return "I Can Do This All Day!";
      case 4:
        return "Ok, You Know What? I Give Up—Let's Do It.";
      case 5:
        return "Sorry, Nope!  Ha! Ha! Ha! 😂";
      case 6:
        return "Really? This Last Chance You Know?";
      default:
        return "To Do List";
    }
  }

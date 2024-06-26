#!/bin/bash

ALLOWED_PREFIXES=("feat" "fix" "build" "chore" "ci" "docs" "style" "refactor" "perf" "test")
TERMINAL_RED='\033[0;31m'
TERMINAL_BLUE='\033[0;36m'
TERMINAL_YELLOW='\033[0;33m'
TERMINAL_NO_COLOR='\033[0m'

# Add git branch if relevant
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

# Extract issue number from branch name (e.g. XXX-1234)
parse_git_branch_for_issue() {
  parse_git_branch | grep -e '[A-Z]\+-[0-9]\+' -o
}

MESSAGE="$(cat $1)"
PARSED_MESSAGE=( $MESSAGE )

# Check if the first word is in the list of allowed prefixes and followed by a colon
FIRST_WORD="${PARSED_MESSAGE[0]}"
PREFIX=${FIRST_WORD/%?}

echo "message: ${MESSAGE}"

if ! [[ " ${ALLOWED_PREFIXES[*]}: " =~ " ${PREFIX} " ]]; then
  echo -e "${TERMINAL_RED} ======ERROR====== ${TERMINAL_NO_COLOR}"
  echo "Commit message format should be:"
  echo -e "${TERMINAL_BLUE}   <prefix>: <message> (<ticket>) ${TERMINAL_NO_COLOR}"
  echo -e "Allowed prefixes: ${TERMINAL_YELLOW} ${ALLOWED_PREFIXES[@]}  ${TERMINAL_NO_COLOR}"
  exit 1
fi

## Validate commit message contains a Ticket or obtain it from the branch name

PARSED_MESSAGE_LENGTH=${#PARSED_MESSAGE[@]}
TICKET=${PARSED_MESSAGE[PARSED_MESSAGE_LENGTH -1]}

if ! (echo $TICKET | grep -q -E '^\(DevOpsFrontend-[0-9]+\).*$'); then
  TICKET_FROM_BRANCH=`parse_git_branch_for_issue`

  if [ -z "$TICKET_FROM_BRANCH" ]; then
    echo -e "${TERMINAL_RED} ======ERROR====== ${TERMINAL_NO_COLOR}"
    echo "TICKET should be present (ticket has format like DevOpsFrontend-1289:"
    echo " - as part of the Branch name"
    echo " - between parenthesis \"( )\" at the end of the commit message as:"
    echo -e "    ${TERMINAL_BLUE} <prefix>: <message> (<ticket>) ${TERMINAL_NO_COLOR}"

    exit 1
  fi

  echo "New commit message: $MESSAGE ($TICKET_FROM_BRANCH)"
  echo "$MESSAGE ($TICKET_FROM_BRANCH)" > $1
fi
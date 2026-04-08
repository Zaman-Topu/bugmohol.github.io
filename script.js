/**
 * Bug Mohol - Interactive Cyberpunk Terminal
 */

document.addEventListener('DOMContentLoaded', () => {
    const outputHistory = document.getElementById('output-history');
    const textElement = document.getElementById('typewriter-text');
    const cursorElement = document.getElementById('typewriter-cursor');
    const inputLine = document.getElementById('input-line');
    const cmdInput = document.getElementById('cmd-input');
    const terminalContent = document.getElementById('terminal-content');

    // Cyber-themed Bengali phrases for initial boot sequence
    const bootSequences = [
        "সিস্টেম ইনিশিয়ালাইজ হচ্ছে...",
        "বাগ মহল সার্ভারে স্বাগতম...",
        "সিকিউরিটি প্রোটোকল লোড করা হয়েছে।",
        "কমান্ড প্রম্পট চালু হচ্ছে..."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let typingSpeed = 50;
    
    const segmenter = ("Intl" in window && "Segmenter" in window.Intl) ? 
        new Intl.Segmenter('bn', { granularity: 'grapheme' }) : null;

    function getSegments(text) {
        if (segmenter) {
            return Array.from(segmenter.segment(text)).map(s => s.segment);
        }
        return Array.from(text);
    }

    // Phase 1: Boot Sequence Typewriter
    function runBootSequence() {
        if (phraseIndex >= bootSequences.length) {
            // Boot sequence finished
            finishBoot();
            return;
        }

        const currentPhrase = bootSequences[phraseIndex];
        const segments = getSegments(currentPhrase);

        charIndex++;
        textElement.textContent = segments.slice(0, charIndex).join('');

        if (charIndex === segments.length) {
            phraseIndex++;
            charIndex = 0;
            // Short pause between lines
            setTimeout(() => {
                const completedLine = document.createElement('div');
                completedLine.className = 'text-bengali';
                completedLine.style.marginBottom = '5px';
                completedLine.textContent = currentPhrase;
                outputHistory.insertBefore(completedLine, textElement);
                textElement.textContent = "";
                runBootSequence();
            }, 600);
        } else {
            typingSpeed = 30 + Math.random() * 40;
            setTimeout(runBootSequence, typingSpeed);
        }
    }

    // Phase 2: Interactive Terminal
    function finishBoot() {
        textElement.style.display = 'none'; // hide typewriter span
        cursorElement.style.display = 'none'; // hide cursor span
        inputLine.style.display = 'flex'; // show actual input
        cmdInput.focus();
        
        // Add a prompt line indicating readiness
        printOutput("টার্মিনাল প্রস্তুত। কমান্ড তালিকা দেখতে 'help' টাইপ করুন।", "info");
    }

    // Listeners for Interactive Terminal
    cmdInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = cmdInput.value.trim().toLowerCase();
            if (command) {
                // Echo command
                printEcho(cmdInput.value);
                // Process command
                processCommand(command);
            }
            cmdInput.value = '';
            scrollToBottom();
        }
    });

    // Make sure clicking anywhere on terminal focuses the input
    document.querySelector('.terminal-wrapper').addEventListener('click', () => {
        if (inputLine.style.display === 'flex') {
            cmdInput.focus();
        }
    });

    function printEcho(cmd) {
        const line = document.createElement('div');
        line.style.display = 'flex';
        line.style.alignItems = 'center';
        line.style.marginBottom = '5px';
        line.style.marginTop = '10px';
        
        line.innerHTML = `<span class="prompt">root@bugmohol:~$</span> <span class="text-bengali">${cmd}</span>`;
        outputHistory.appendChild(line);
    }

    function printOutput(text, type='normal') {
        const line = document.createElement('div');
        line.className = 'text-bengali';
        line.style.marginBottom = '10px';
        line.style.whiteSpace = 'pre-line'; // For multiline outputs
        
        if (type === 'error') {
            line.style.color = '#ff3333';
            line.style.textShadow = '0 0 5px rgba(255, 0, 0, 0.6)';
        } else if (type === 'info') {
            line.style.color = '#aaffaa';
        }
        
        line.textContent = text;
        outputHistory.appendChild(line);
        scrollToBottom();
    }

    function processCommand(cmd) {
        switch(cmd) {
            case 'help':
                printOutput(
                    "সাহায্যের জন্য উপলব্ধ কমান্ডসমূহ:\n" +
                    "- about   : আমাদের সম্পর্কে জানুন\n" +
                    "- contact : যোগাযোগের ঠিকানা\n" +
                    "- founder : প্রতিষ্ঠাতা সম্পর্কে তথ্য\n" +
                    "- clear   : স্ক্রিন পরিষ্কার করুন"
                );
                break;
            case 'about':
                printOutput("বাগ মহল একটি প্রিমিয়ার সাইবার সিকিউরিটি ও আইটি কনসাল্টিং ফার্ম। আমরা আপনার ডিজিটাল সম্পদ সুরক্ষিত রাখতে কাজ করি।");
                break;
            case 'contact':
                printOutput("ইমেইল: contact@bugmohol.com\nফোন: +880 1711-223344\nঅবস্থান: ঢাকা, বাংলাদেশ");
                break;
            case 'founder':
                printOutput("প্রতিষ্ঠাতা: তৌফিক জামান তপু\n(সাইবার সিকিউরিটি স্পেশালিস্ট ও ইথিকাল হ্যাকার)");
                break;
            case 'clear':
                outputHistory.innerHTML = ''; // clear everything
                break;
            case 'sudo':
                printOutput("অ্যাক্সেস ডিনাইড (Access Denied)। এই ঘটনার রিপোর্ট সিস্টেম অ্যাডমিনের কাছে পাঠানো হয়েছে!", "error");
                break;
            default:
                printOutput("কমান্ডটি শনাক্ত করা যায়নি: '" + cmd + "'\nকমান্ডের তালিকা দেখতে 'help' টাইপ করুন।", "error");
                break;
        }
    }

    function scrollToBottom() {
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    // Expose function globally for menu linking
    window.runMenuCommand = function(cmd) {
        if (inputLine.style.display !== 'flex') return; // Cannot run commands before boot finishes
        printEcho(cmd);
        processCommand(cmd);
        scrollToBottom();
    };

    // Start boot sequence
    setTimeout(runBootSequence, 1000);
});

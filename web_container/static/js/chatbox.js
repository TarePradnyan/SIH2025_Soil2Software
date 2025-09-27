// static/js/chatbox.js
document.addEventListener('DOMContentLoaded', () => {

    // 50 agriculture-related questions & answers
    const agricultureQA = [
        { q: "Which crops are suitable for monsoon in Punjab?", a: "Rice, Maize, Soybean, and Cotton are suitable for monsoon." },
        { q: "Best fertilizer for wheat in Punjab?", a: "Urea and DAP applied as per soil test are recommended." },
        { q: "When should mustard be sown?", a: "Mustard is usually sown between mid-October and early November." },
        { q: "How to control pests in cotton?", a: "Use neem oil, pheromone traps, and recommended insecticides." },
        { q: "Which crop needs the most water?", a: "Rice requires the most water among major crops." },
        { q: "Ideal soil for sugarcane?", a: "Loamy, alluvial soil with good water retention." },
        { q: "Best irrigation method for maize?", a: "Drip irrigation or furrow irrigation." },
        { q: "How to improve soil fertility?", a: "Use green manure, compost, and crop rotation." },
        { q: "Top wheat varieties in Punjab?", a: "PBW 343, PBW 502, HD 2967, WH 1105." },
        { q: "Best pest control for rice?", a: "Integrated pest management using neem extracts and resistant varieties." },
        { q: "When to harvest wheat?", a: "Usually in April when grains are hard and yellow." },
        { q: "Recommended spacing for maize?", a: "Row spacing 60-75 cm, plant spacing 20-25 cm." },
        { q: "Which crop grows well in sandy soil?", a: "Cotton and mustard can grow well in sandy soil." },
        { q: "How to prevent waterlogging in rice?", a: "Ensure proper field leveling and drainage channels." },
        { q: "Best variety of rice in Punjab?", a: "PR 126, PR 121, and PUSA Basmati 1121." },
        { q: "How to increase wheat yield?", a: "Use certified seeds, proper fertilization, and timely irrigation." },
        { q: "Best time to plant sugarcane?", a: "Planting is done from February to March." },
        { q: "How to control weeds in maize?", a: "Manual weeding or recommended herbicides." },
        { q: "How much urea for wheat?", a: "Around 100-120 kg per hectare, split into doses." },
        { q: "How to check soil pH?", a: "Use a soil testing kit or send sample to lab." },
        { q: "Best storage method for grains?", a: "Use moisture-free, airtight storage bins or bags." },
        { q: "Which crop is best for low rainfall?", a: "Mustard and pulses can tolerate low rainfall." },
        { q: "How to prevent pest attacks in rice?", a: "Maintain proper water levels and use IPM practices." },
        { q: "Which fertilizer is good for maize?", a: "Apply DAP at sowing and urea in split doses." },
        { q: "Best sowing time for maize?", a: "June to July during monsoon." },
        { q: "How to control aphids in mustard?", a: "Spray neem-based insecticides or chemical control." },
        { q: "Top soybean variety in Punjab?", a: "PS 1042, JS 335." },
        { q: "How to prevent fungal diseases in wheat?", a: "Use fungicides and resistant varieties." },
        { q: "Best water-saving method for rice?", a: "System of Rice Intensification (SRI) method." },
        { q: "Recommended NPK for cotton?", a: "Nitrogen 120 kg, Phosphorus 60 kg, Potassium 40 kg per hectare." },
        { q: "How to identify nutrient deficiency?", a: "Look for yellowing leaves, stunted growth, or abnormal coloring." },
        { q: "Which crop grows fast in Punjab?", a: "Maize grows quickly and is harvested in 3-4 months." },
        { q: "How to prevent lodging in wheat?", a: "Avoid excess nitrogen and use proper plant density." },
        { q: "Best time for harvesting sugarcane?", a: "December to March when sucrose content is high." },
        { q: "Which crop tolerates saline soil?", a: "Barley and mustard can tolerate slightly saline soil." },
        { q: "How to prevent rust in wheat?", a: "Use resistant varieties and timely fungicide sprays." },
        { q: "Best irrigation for mustard?", a: "Apply light irrigation during flowering and pod formation." },
        { q: "How to improve maize yield?", a: "Use hybrid seeds, proper fertilization, and timely irrigation." },
        { q: "Best season for soybean?", a: "Monsoon season: June to July." },
        { q: "How to reduce pest attack in sugarcane?", a: "Use bagasse traps, biological control, and insecticides." },
        { q: "Top barley variety in Punjab?", a: "PL 801, RD 2035." },
        { q: "How to store mustard seeds?", a: "Keep in dry, cool, airtight containers." },
        { q: "Which crops are high profit in Punjab?", a: "Rice, wheat, cotton, and vegetables like tomato & onion." },
        { q: "How to increase rice yield?", a: "Use high-yielding varieties and proper water management." },
        { q: "How to manage stubble burning?", a: "Use happy seeders, mulching, and composting to reduce burning." },
        { q: "Which fertilizer is best for sugarcane?", a: "Apply NPK as per soil test; typically 120:60:60 kg/ha." },
        { q: "How to prevent leaf spot in cotton?", a: "Spray recommended fungicides during early infection." },
        { q: "Best time for sowing pulses?", a: "June to July during monsoon." },
        { q: "How to improve soil moisture retention?", a: "Use organic manure, mulching, and cover crops." },
        { q: "Which crop is best for high rainfall?", a: "Rice and maize thrive in high rainfall areas." }
    ];

    // Inject chatbox HTML
    function injectChatboxHTML() {
        const chatboxHTML = `
            <div class="chat-widget">
                <button id="chat-toggle-btn" class="chat-toggle-btn">🤖</button>
                <div id="chat-popup" class="chat-popup" aria-hidden="true">
                    <div class="chat-header">
                        <h3>Punjab Agriculture Assistant</h3>
                        <button id="chat-close-btn" class="chat-close-btn" aria-label="Close chat">&times;</button>
                    </div>
                    <div id="chat-messages" class="chat-messages" role="log" aria-live="polite">
                        <div class="message bot-message">
                            <p>Hello! Ask me anything about agriculture in Punjab.</p>
                        </div>
                    </div>
                    <form id="chat-form" class="chat-form">
                        <input type="text" id="chat-input" placeholder="Type your question..." autocomplete="off" required>
                        <button type="submit" id="chat-send-btn">Send</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatboxHTML);
    }

    // Minimal CSS
    function injectMinimalCSS() {
        const css = `
            .chat-widget { position: fixed; right: 20px; bottom: 20px; z-index: 9999; font-family: Arial, sans-serif; }
            .chat-toggle-btn { width:48px; height:48px; border-radius:50%; font-size:22px; cursor:pointer; }
            .chat-popup { width: 320px; max-height: 70vh; display:none; flex-direction:column; background:white; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.15); overflow:hidden; }
            .chat-popup.show { display:flex; }
            .chat-header { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid #eee; }
            .chat-messages { padding:12px; overflow:auto; display:flex; flex-direction:column; gap:10px; }
            .chat-form { display:flex; border-top:1px solid #eee; padding:8px; }
            .chat-form input { flex:1; padding:8px 10px; border-radius:8px; border:1px solid #ddd; outline:none; }
            .chat-form button { margin-left:8px; padding:8px 12px; border-radius:8px; cursor:pointer; }
            .message { max-width:85%; padding:8px 10px; border-radius:10px; }
            .bot-message { background:#f1f1f1; align-self:flex-start; }
            .user-message { background:#DCF8C6; align-self:flex-end; }
            .typing { font-style:italic; color:#666; }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    injectChatboxHTML();
    injectMinimalCSS();

    // Elements
    const chatToggleButton = document.getElementById('chat-toggle-btn');
    const chatPopup = document.getElementById('chat-popup');
    const chatCloseButton = document.getElementById('chat-close-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle popup
    chatToggleButton.addEventListener('click', () => {
        const isShown = chatPopup.classList.toggle('show');
        chatPopup.setAttribute('aria-hidden', !isShown);
        if (isShown) chatInput.focus();
    });
    chatCloseButton.addEventListener('click', () => {
        chatPopup.classList.remove('show');
        chatPopup.setAttribute('aria-hidden', 'true');
    });

    function addMessage(text, className = 'bot-message') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
        const p = document.createElement('p');
        p.textContent = text;
        messageElement.appendChild(p);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAnswer(userMessage) {
        const found = agricultureQA.find(item => item.q.toLowerCase() === userMessage.toLowerCase());
        return found ? found.a : "Sorry, I don't have an answer for that question.";
    }

    // Submit listener with 5-second delay
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, 'user-message');
        chatInput.value = '';

        // Show typing
        const typingEl = document.createElement('div');
        typingEl.className = 'message bot-message typing';
        typingEl.innerHTML = '<p>Typing…</p>';
        chatMessages.appendChild(typingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingEl.remove();
            const botReply = getAnswer(userMessage);
            addMessage(botReply, 'bot-message');
        }, 5000); // 5-second delay
    });

});

import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:intl/intl.dart';
import 'add_schedule_screen.dart';
import 'custom_app_bar.dart';

class ScheduledActivitiesScreen extends StatefulWidget {
  final List<Map<String, dynamic>> tasks;

  ScheduledActivitiesScreen({required this.tasks});

  @override
  _ScheduledActivitiesScreenState createState() => _ScheduledActivitiesScreenState();
}

class _ScheduledActivitiesScreenState extends State<ScheduledActivitiesScreen> {
  DateTime _selectedDay = DateTime.now();
  DateTime _focusedDay = DateTime.now();
  final DateFormat _dateFormat = DateFormat('yyyy-MM-dd');

  void _addTask(Map<String, dynamic> task) {
    setState(() {
      widget.tasks.add(task);
    });
  }

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> _selectedTasks = widget.tasks
        .where((task) {
          try {
            return isSameDay(_dateFormat.parse(task['date']), _selectedDay);
          } catch (e) {
            print('Error parsing date: ${task['date']}');
            return false;
          }
        })
        .toList();

    return Scaffold(
      appBar: CustomAppBar(title: 'Scheduled Activities', hasNotifications: true),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TableCalendar(
              firstDay: DateTime.utc(2020, 1, 1),
              lastDay: DateTime.utc(2030, 12, 31),
              focusedDay: _focusedDay,
              selectedDayPredicate: (day) {
                return isSameDay(_selectedDay, day);
              },
              onDaySelected: (selectedDay, focusedDay) {
                setState(() {
                  _selectedDay = selectedDay;
                  _focusedDay = focusedDay;
                });
              },
              calendarBuilders: CalendarBuilders(
                markerBuilder: (context, date, events) {
                  List<Widget> markers = [];
                  for (var task in widget.tasks) {
                    try {
                      if (isSameDay(_dateFormat.parse(task['date']), date)) {
                        markers.add(
                          Positioned(
                            bottom: 1,
                            child: Container(
                              width: 7,
                              height: 7,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: task['color'],
                              ),
                            ),
                          ),
                        );
                      }
                    } catch (e) {
                      print('Error parsing date: ${task['date']}');
                    }
                  }
                  return Stack(
                    alignment: Alignment.center,
                    children: markers,
                  );
                },
              ),
              calendarStyle: CalendarStyle(
                todayDecoration: BoxDecoration(
                  color: Colors.orange,
                  shape: BoxShape.circle,
                ),
                selectedDecoration: BoxDecoration(
                  color: Colors.blue,
                  shape: BoxShape.circle,
                ),
              ),
              headerStyle: HeaderStyle(
                formatButtonVisible: false, // Hides the "2 weeks" button
              ),
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: _selectedTasks.length,
                itemBuilder: (context, index) {
                  final task = _selectedTasks[index];
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundColor: task['color'],
                    ),
                    title: Text(task['case']),
                    subtitle: Text('${task['description']}\n${task['time']}'),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final newTask = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => AddScheduleScreen(onAddTask: _addTask),
            ),
          );
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.yellow,
      ),
    );
  }
}
